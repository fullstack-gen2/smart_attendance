export interface SystemSetting {
  id: number;
  settingKey: string;
  settingValue: string;
  type: "INT" | "STRING" | "BOOLEAN" | "FLOAT";
  description: string;
  updatedAt: string;
  updatedBy?: { name: string; email: string };
  createdAt: string;
}
