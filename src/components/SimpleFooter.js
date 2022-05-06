export default function SimpleFooter() {
    return (
      <>
        <footer className="pt-8 pb-6">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4 md:justify-between">
              <ul className="list-unstyled flex gap-8">
                <li>
                  <a
                    href="https://totalenergies.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white font-medium block pb-2 text-sm"
                  >
                    About TotalEnergies
                  </a>
                </li>

                <li>
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white font-medium block pb-2 text-sm"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>

              <div className="text-sm text-white font-medium">
                Copyright © {new Date().getFullYear()} CSR .
              </div>
            </div>
          </div>
        </footer>
      </>
    );
}
