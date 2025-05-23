import MultiSelectProducts from "./presentation/components/multi-select/MultiSelectProducts";
import {Provider} from "react-redux";
import {store} from "./domain/store/store";

function App() {
  return (
    <main className="font-onest min-h-screen flex justify-center items-center p-4 md:p-8 lg:p-12 max-w-4xl mx-auto">
      <Provider store={store}>
        <div className="bg-white rounded-lg shadow-lg p-6 w-full">
          <MultiSelectProducts />
        </div>
      </Provider>
    </main>
  );
}

export default App;
