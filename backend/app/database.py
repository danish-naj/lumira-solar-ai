from typing import Dict, List, Optional
from app.models.schemas import SolarFarm, SolarModule, WorkOrder, WorkOrderStatus, DefectType, SeverityLevel
from app.data.seed_data import generate_bhadla_farm, generate_apex_rooftop, generate_pavagada_farm
from app.data.sample_images import create_rgb_panel, create_thermal_panel
from app.services.scoring_engine import calculate_module_health_score, calculate_farm_health_score
from app.services.energy_loss_calc import calculate_energy_and_financial_loss

class SolarDatabase:
    def __init__(self):
        self.farms: Dict[str, SolarFarm] = {}
        self.modules: Dict[str, Dict[str, SolarModule]] = {}  # farm_id -> {mod_id: SolarModule}
        self.work_orders: Dict[str, List[WorkOrder]] = {}     # farm_id -> List[WorkOrder]
        self._seed()

    def _seed(self):
        f1, m1, w1 = generate_bhadla_farm()
        self.farms[f1.id] = f1
        self.modules[f1.id] = {m.id: m for m in m1}
        self.work_orders[f1.id] = w1

        f2, m2, w2 = generate_apex_rooftop()
        self.farms[f2.id] = f2
        self.modules[f2.id] = {m.id: m for m in m2}
        self.work_orders[f2.id] = w2

        f3, m3, w3 = generate_pavagada_farm()
        self.farms[f3.id] = f3
        self.modules[f3.id] = {m.id: m for m in m3}
        self.work_orders[f3.id] = w3

    def get_all_farms(self) -> List[SolarFarm]:
        return list(self.farms.values())

    def get_farm(self, farm_id: str) -> Optional[SolarFarm]:
        return self.farms.get(farm_id)

    def get_modules(self, farm_id: str, defect_type: str = None, severity: str = None, inverter_id: str = None) -> List[SolarModule]:
        farm_mods = self.modules.get(farm_id, {})
        result = list(farm_mods.values())
        if defect_type and defect_type != "ALL":
            result = [m for m in result if any(d.type.value == defect_type for d in m.defects)]
        if severity and severity != "ALL":
            result = [m for m in result if m.status.value == severity]
        if inverter_id and inverter_id != "ALL":
            result = [m for m in result if m.inverter_id == inverter_id]
        return result

    def get_module(self, farm_id: str, module_id: str) -> Optional[SolarModule]:
        return self.modules.get(farm_id, {}).get(module_id)

    def update_module_defect(self, farm_id: str, module_id: str, defect, new_health: int, loss_kwh: float, loss_usd: float):
        if farm_id in self.modules and module_id in self.modules[farm_id]:
            mod = self.modules[farm_id][module_id]
            mod.defects = [defect]
            mod.health_score = new_health
            mod.status = defect.severity if new_health < 85 else SeverityLevel.NONE
            mod.daily_energy_loss_kwh = loss_kwh
            mod.daily_revenue_loss_usd = loss_usd
            mod.current_power_w = round(mod.nominal_power_w * (new_health / 100.0), 1)
            self._recalc_farm_stats(farm_id)

    def get_work_orders(self, farm_id: str) -> List[WorkOrder]:
        return self.work_orders.get(farm_id, [])

    def add_work_order(self, work_order: WorkOrder):
        if work_order.farm_id not in self.work_orders:
            self.work_orders[work_order.farm_id] = []
        self.work_orders[work_order.farm_id].insert(0, work_order)
        self._recalc_farm_stats(work_order.farm_id)

    def update_work_order_status(self, farm_id: str, work_order_id: str, new_status: WorkOrderStatus, notes: str = None) -> Optional[WorkOrder]:
        orders = self.work_orders.get(farm_id, [])
        for order in orders:
            if order.id == work_order_id:
                order.status = new_status
                if notes:
                    order.repair_notes = notes
                if new_status == WorkOrderStatus.VERIFIED:
                    # Restore module health
                    if farm_id in self.modules and order.module_id in self.modules[farm_id]:
                        mod = self.modules[farm_id][order.module_id]
                        mod.defects = []
                        mod.health_score = 100
                        mod.status = SeverityLevel.NONE
                        mod.daily_energy_loss_kwh = 0.0
                        mod.daily_revenue_loss_usd = 0.0
                        mod.current_power_w = mod.nominal_power_w
                        self._recalc_farm_stats(farm_id)
                return order
        return None

    def _recalc_farm_stats(self, farm_id: str):
        if farm_id in self.farms and farm_id in self.modules:
            mods = list(self.modules[farm_id].values())
            farm = self.farms[farm_id]
            farm.health_score = int(sum(m.health_score for m in mods) / len(mods))
            farm.healthy_count = sum(1 for m in mods if m.health_score >= 85)
            farm.warning_count = sum(1 for m in mods if 50 <= m.health_score < 85)
            farm.critical_count = sum(1 for m in mods if m.health_score < 50)
            farm.total_daily_loss_kwh = round(sum(m.daily_energy_loss_kwh for m in mods), 2)
            farm.total_daily_loss_usd = round(sum(m.daily_revenue_loss_usd for m in mods), 2)
            farm.open_work_orders = sum(1 for w in self.work_orders.get(farm_id, []) if w.status != WorkOrderStatus.VERIFIED)

db = SolarDatabase()
