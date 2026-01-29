export default function SystemPipeline() {
  return (
    <section
      id="pipeline"
      className="bg-black text-gray-300 py-24 px-6"
    >
      <div className="max-w-5xl mx-auto space-y-10">
        <h3 className="text-3xl font-bold text-white text-center">
          Forensic Pipeline
        </h3>

        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="border border-gray-700 rounded-lg p-6 bg-[#050505]">
            <p className="text-indigo-400 mb-2">Tier 1</p>
            <p>
              Biological consistency via rPPG, eye convergence,
              and micro-expression analysis.
            </p>
          </div>

          <div className="border border-gray-700 rounded-lg p-6 bg-[#050505]">
            <p className="text-indigo-400 mb-2">Tier 2</p>
            <p>
              Physical artifacts including lighting, depth,
              and compression inconsistencies.
            </p>
          </div>

          <div className="border border-gray-700 rounded-lg p-6 bg-[#050505]">
            <p className="text-indigo-400 mb-2">Tier 3</p>
            <p>
              Temporal coherence, identity stability,
              and multi-model fusion scoring.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
