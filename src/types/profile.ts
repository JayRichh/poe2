import type { BuildVisibility as SettingsBuildVisibility } from "~/app/actions/settings";

export type BuildVisibility = SettingsBuildVisibility;

export interface POEProfile {
  characters?: Array<any>;
  [key: string]: any;
}

export interface POEAccount {
  connected: boolean;
  accountName?: string;
  lastSync?: string;
}

export interface BuildSettingsUpdate {
  autoSync?: boolean;
  defaultVisibility?: BuildVisibility;
}
