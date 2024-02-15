export interface schedule {
  event_id: string;
  event_title: string;
  event_timing: string;
  event_type: string;
  created_at: string;
  updated_at: string;
  speakers: {
    speaker_name: string;
  };
}

export interface timingMap {
  [key: string]: schedule[];
}
