interface GoatCounter {
  no_onload?: boolean;
  allow_local?: boolean;
  path?: string;
  count?: (opts?: {
    path?: string;
    title?: string;
    event?: boolean;
    referrer?: string;
  }) => void;
  visit_count?: (opts?: {
    append?: string;
    type?: 'html' | 'svg' | 'png';
    path?: string;
    no_branding?: boolean;
    attr?: Record<string, string>;
    style?: string;
    start?: string;
    end?: string;
  }) => void;
}

declare interface Window {
  goatcounter?: GoatCounter;
}
