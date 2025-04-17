export interface RouteProps {
    chooseOption: {
      flight: {
       
        origin: { origin: string; setOrigin: (value: string) => void };
      };
    };
    setVisible: (value:string) => void;
    
  }