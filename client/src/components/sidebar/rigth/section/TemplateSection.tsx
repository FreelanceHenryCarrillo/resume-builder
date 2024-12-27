function TemplateSection() {
  return (
    <div>
      <div className="text-xl font-semibold flex items-center">
        <h2>Templates</h2>
      </div>
      <div className="flex h-auto gap-2 flex-wrap items-center justify-center py-5  ">
        <div className="flex items- justify-center w-[200px] bg-[url(/portadaOnyx.png)] bg-cover border-2  h-[250px] rounded-lg cursor-pointer relative  hover:scale-[1.02]">
          <div className="absolute hover:bg-black/20 w-full h-full text-center flex items-end justify-center hover:text-white ">
              <p className="mb-2 text-lg font-semibold">Onyx</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateSection;
