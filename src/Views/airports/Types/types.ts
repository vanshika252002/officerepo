export interface Airport {
  setVisible: (value: string) => void;
  setOrigin: (value: string) => void;
}
export interface Data {
  components: {
    country: string;
  };
  annotations: {
    flag: string;
  };
}
