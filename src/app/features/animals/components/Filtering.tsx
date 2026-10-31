import { FormEvent, useState } from "react";

interface FilteringProps {
  // Callback som lar parent håndtere søketekst og ordliste
  onFilterChange: (rawText: string, words: string[]) => void;
}

export function Filtering({ onFilterChange }: FilteringProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const rawText = value.trim();

    // Del opp i ord basert på mellomrom og evt. ekstra whitespace
    const words =
      rawText.length === 0
        ? []
        : rawText
            .split(/\s+/)
            .map((w) => w.toLowerCase())
            .filter((w) => w.length > 0);

    onFilterChange(rawText, words);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Søk etter dyr (navn, kallenavn, art, beskrivelse osv.):
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="F.eks: sort katt hvite poter"
        />
      </label>
      <button type="submit">Filtrer</button>
    </form>
  );
}