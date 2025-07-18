import * as z from "zod/v4";

const Prop = z.object({
  progress: z.number().min(0).max(1),
  length: z.number()
});
type Prop = z.infer<typeof Prop>;

export default function ProgressBar({ progress, length }: Prop) {
  const blockMap = ["▏", "▎", "▍", "▌", "▋", "▊", "▉", "█"];
  const fullBlock = "█";
  const emptyBlock = " ";

  const blockFloat = (progress * length);
  const blockInt = Math.floor(blockFloat);
  const blockRemainderChar = blockMap[Math.floor((blockFloat - blockInt) * 8)];
  const emptyBlocks = length - blockInt - 1;

  const barString =
    fullBlock.repeat(blockInt) +
    (blockInt < length ? blockRemainderChar : "");
  const whiteSpace = (<pre>{emptyBlock.repeat(Math.max(0, emptyBlocks))}</pre>)

  return (
    <span className="flex flex-row ">
      [{barString}{whiteSpace}]
    </span>
  );
}