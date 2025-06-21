export default function SiteFooter() {
  return (
    <footer className="bg-linear-to-tr  bg-stone-800 text-white rounded-lg py-8 px-4 shadow-md mt-16">
      <div className="container mx-auto max-w-2xl xl:max-w-3xl ">
        <div className="flex flex-col gap-4 py-8 text-center">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-2xl font-extrabold">
              <span className="text-white">byNiko</span>
            </h2>
            <p className="text-sm">website & brand development for the arts</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
