import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

export type Mood = {
  emoji: string;
  label: string;
}

const moods:Mood[] = [
  { emoji: "😄", label: "開心" },
  { emoji: "😐", label: "普通" },
  { emoji: "😢", label: "難過" },
  { emoji: "😠", label: "生氣" },
  { emoji: "😴", label: "疲累" },
];

type Props = {
  onMoodSelect: (mood: Mood) => void;
  value?: Mood;
}

export default function MoodSelector({ onMoodSelect, value }: Props) {
  const handleChange = (value: string) => {
    const mood = moods.find((m) => m.emoji === value);
    if (onMoodSelect && mood) {
      onMoodSelect(mood);
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={value ? value.emoji : undefined}
      onValueChange={handleChange}
      className="flex gap-4 justify-center my-4"
    >
      {moods.map((mood) => (
        <ToggleGroupItem
          key={mood.emoji}
          value={mood.emoji}
          aria-label={mood.label}
          className="text-3xl px-4 py-2 rounded-full first:rounded-full last:rounded-full transition hover:scale-110 data-[state=on]:bg-yellow-300 data-[state=on]:shadow-md"
        >
          {mood.emoji}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
