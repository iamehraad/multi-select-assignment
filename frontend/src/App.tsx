import MultiSelectProducts from "./presentation/components/multi-select/MultiSelectProducts";
import {Provider} from "react-redux";
import {store} from "./domain/store/store";

function App() {
  return (
    <main className="font-onest min-h-screen p-4 md:p-8 lg:p-12 max-w-4xl mx-auto">
      <Provider store={store}>
        <h1 className="text-3xl font-bold mb-8">Multi-Select Filter Demo</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <MultiSelectProducts />
        </div>
      </Provider>
    </main>
  );
}

export default App;
