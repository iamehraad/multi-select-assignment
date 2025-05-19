import MultiSelect from "./components/multi-select/MultiSelect.tsx";

function App() {
  return (
      <main className="font-onest min-h-screen p-4 md:p-8 lg:p-24 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Multi-Select Filter Demo</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <MultiSelect/>
        </div>
      </main>
  );
}

export default App;
