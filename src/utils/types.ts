export interface OptionType {
  name: string;
  icon: string;
  styles: string;
  winner?: boolean | false;
}

export interface RulesType {
  [key: string]: {
    beats: string[];
  };
}