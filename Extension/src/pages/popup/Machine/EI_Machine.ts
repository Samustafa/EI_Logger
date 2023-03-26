import {createMachine} from "xstate";

export const EI_Machine= createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgFEBJAfQBksoYAnfEABy1gEsAXZrDOgD0QFoATABZ0AT37DkaEMXKUaAOgByWViQCCAV1YALMBnYBjAIatIdRi3aceiYWMQA2AMwKArAAYvHx0ICcABwCbn4AjMFS6LIUVGDUyqoa2noGzCZmEApkxhgQzBhQAArGMBZMbBxcSCC8CADsAg4IoZ4Kfu1+jgICjnXOzgFujlJSQA */
  "id": "EI_Logger",
  "initial": "Not_Authenticated",
  "states": {
    "Not_Authenticated": {
      "initial": "LandingPage",
      "states": {
        "LandingPage": {}
      }
    }
  },
  "predictableActionArguments": true,
  "preserveActionOrder": true
});