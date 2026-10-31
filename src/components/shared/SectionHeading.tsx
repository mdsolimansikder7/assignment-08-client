type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-10 text-center">
      <h2 className="font-heading text-3xl font-bold text-heading md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
