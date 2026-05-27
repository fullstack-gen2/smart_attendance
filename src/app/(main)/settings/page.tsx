import type { ApiResponse } from "@/lib/type/apiTypes";
import type { SystemSetting } from "@/lib/type/settingTypes";
import { Badge } from "@/components/ui/badge";
import { Settings, Clock, MapPin, Bell, QrCode, Shield } from "lucide-react";

const API_URL = process.env.API_URL;

const ICON_MAP: Record<string, React.ElementType> = {
  early_checkin_minutes: Clock,
  teacher_edit_deadline_minutes: Clock,
  student_attendance_cutoff_minutes: Clock,
  late_threshold_minutes: Clock,
  gps_allowed_radius_meters: MapPin,
  attendance_reminder_enabled: Bell,
  qr_expire_seconds: QrCode,
  max_sessions_per_day: Shield,
};

const TYPE_COLORS: Record<string, string> = {
  INT: "border-blue-200 bg-blue-50 text-blue-700",
  BOOLEAN: "border-emerald-200 bg-emerald-50 text-emerald-700",
  STRING: "border-amber-200 bg-amber-50 text-amber-700",
  FLOAT: "border-violet-200 bg-violet-50 text-violet-700",
};

function formatKey(key: string) {
  return key
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatValue(setting: SystemSetting) {
  if (setting.type === "BOOLEAN") {
    return setting.settingValue === "true" ? "Enabled" : "Disabled";
  }
  if (setting.type === "INT" || setting.type === "FLOAT") {
    const unit = setting.settingKey.endsWith("_minutes")
      ? " min"
      : setting.settingKey.endsWith("_seconds")
      ? " sec"
      : setting.settingKey.endsWith("_meters")
      ? " m"
      : "";
    return `${setting.settingValue}${unit}`;
  }
  return setting.settingValue;
}

async function getSettings(): Promise<SystemSetting[]> {
  try {
    const res = await fetch(`${API_URL}/settings`, {
      cache: "no-store",
    });
    if (!res.ok) return [];

    const json: ApiResponse<SystemSetting[]> = await res.json();

    return json.payload ?? [];
  } catch {
    return [];
  }
}

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="px-5 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#273C97]">
          <Settings className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#273C97]">System Settings</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            {settings.length} configuration keys
          </p>
        </div>
      </div>

      {settings.length === 0 ? (
        <div className="py-20 text-center text-gray-400">
          <Settings className="mx-auto mb-4 h-12 w-12 opacity-30" />
          <p className="text-lg">No settings found</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_1fr_1fr_2fr_1fr] bg-[#273C97] px-6 py-3 text-sm font-semibold text-white">
            <span>Setting</span>
            <span>Value</span>
            <span>Type</span>
            <span>Description</span>
            <span>Last Updated</span>
          </div>

          {/* Rows */}
          {settings.map((setting, i) => {
            const Icon = ICON_MAP[setting.settingKey] ?? Settings;
            const isBoolean = setting.type === "BOOLEAN";
            const isEnabled = setting.settingValue === "true";

            return (
              <div
                key={setting.id}
                className={`grid grid-cols-[2fr_1fr_1fr_2fr_1fr] items-center border-t border-gray-100 px-6 py-4 transition-colors hover:bg-blue-50/30 ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/40"
                }`}
              >
                {/* Key */}
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#273C97]/10">
                    <Icon className="h-4 w-4 text-[#273C97]" />
                  </div>
                  <span className="font-medium text-gray-900 text-sm">
                    {formatKey(setting.settingKey)}
                  </span>
                </div>

                {/* Value */}
                <div>
                  {isBoolean ? (
                    <Badge
                      variant="outline"
                      className={
                        isEnabled
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-red-200 bg-red-50 text-red-600"
                      }
                    >
                      {isEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  ) : (
                    <span className="font-mono text-sm font-semibold text-[#273C97]">
                      {formatValue(setting)}
                    </span>
                  )}
                </div>

                {/* Type */}
                <div>
                  <Badge
                    variant="outline"
                    className={
                      TYPE_COLORS[setting.type] ??
                      "border-gray-200 bg-gray-50 text-gray-600"
                    }
                  >
                    {setting.type}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500">{setting.description}</p>

                {/* Updated */}
                <p className="text-xs text-gray-400">
                  {new Date(setting.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  {setting.updatedBy && (
                    <span className="block text-gray-400">
                      by {setting.updatedBy.name}
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
