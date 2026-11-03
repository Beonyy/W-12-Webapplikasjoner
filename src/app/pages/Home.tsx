

/**
 * En server-komponent. Den kjører på serveren, én gang per forespørsel, og
 * nettleseren får ferdig HTML. Derfor viser klokka under tidspunktet på
 * serveren, og den endrer seg bare når du laster siden på nytt.
 *
 * Server-komponent er standarden i RedwoodSDK. Trenger du klikk eller state,
 * lager du en klient-komponent, som `TimeClient` og `Counter` under.
 */
export function Home() {
  const now = new Date().toLocaleString("no-NO");

  return (
    <main className="mx-auto max-w-2xl p-8 font-sans">
      <h1 className="text-3xl font-bold">Petz4You</h1>

      <a href="/register-pet">Registrer dyr</a>
      <br/>
      <a href="/search-pet">Søk etter dyr</a>
    </main>
  );
}
