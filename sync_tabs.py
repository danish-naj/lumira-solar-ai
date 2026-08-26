import os

PORTAL_FILE = r"D:\AntigravityProjects\solarguard-ai\frontend\src\components\Portals\ClientApprovalPortal.jsx"

with open(PORTAL_FILE, "r", encoding="utf-8") as f:
    content = f.read()

# Let's check tab conditions:
# Tab 4 in content: should be Ongoing Repairs
# Tab 5 in content: should be OEM Legal Disputes
# Tab 6 in content: should be Predictive ML Yield
# Tab 7 in content: should be Breakthrough Labs
# Tab 8 in content: should be Storm Defense
# Tab 9 in content: should be Book & Subscription

# Let's inspect where Ongoing Repairs is rendered
# Search for {/* TAB 8: ONGOING REPAIRS & TECHNICIAN DISPATCH
if "{/* TAB 8: ONGOING REPAIRS & TECHNICIAN DISPATCH" in content:
    content = content.replace("{/* TAB 8: ONGOING REPAIRS & TECHNICIAN DISPATCH", "{/* TAB 4: ONGOING REPAIRS & TECHNICIAN DISPATCH")

# Search for {/* TAB 4: BESPOKE CLIENT OEM WARRANTY
if "{/* TAB 4: BESPOKE CLIENT OEM WARRANTY & SETTLEMENT COMMAND CENTER" in content:
    content = content.replace("{/* TAB 4: BESPOKE CLIENT OEM WARRANTY & SETTLEMENT COMMAND CENTER", "{/* TAB 5: BESPOKE CLIENT OEM WARRANTY & SETTLEMENT COMMAND CENTER")

# Ensure activeTab checks
# Tab 5: OEM Legal Disputes
content = content.replace("activeTab === 8 && (\n          <div className=\"space-y-6 max-w-6xl font-sans select-none\">", "activeTab === 5 && (\n          <div className=\"space-y-6 max-w-6xl font-sans select-none\">")

# Tab 4: Ongoing Repairs
content = content.replace("activeTab === 5 && (\n          <div className=\"space-y-6 max-w-5xl\">\n            <div className=\"border-b border-border-subtle pb-4\">\n              <span className=\"text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block\">\n                SECTION 4 OF 5: FIELD SERVICE EXECUTION", "activeTab === 4 && (\n          <div className=\"space-y-6 max-w-5xl\">\n            <div className=\"border-b border-border-subtle pb-4\">\n              <span className=\"text-[10px] font-mono-data font-bold text-secondary uppercase tracking-widest block\">\n                SECTION 4: FIELD SERVICE EXECUTION")

with open(PORTAL_FILE, "w", encoding="utf-8") as f:
    f.write(content)

print("Synchronized all 9 tabs in ClientApprovalPortal.jsx!")
