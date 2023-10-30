import { FC } from "react";

import { QueryProvider } from "./context";
import OptimisticUpdateViaCache from "./examples/OptimisticUpdateViaCache";
import OptimisticUpdateViaUI from "./examples/OptimisticUpdateViaUI";

const App: FC = () => (
  <QueryProvider>
    <OptimisticUpdateViaCache />
    <OptimisticUpdateViaUI />
  </QueryProvider>
);

export default App;
