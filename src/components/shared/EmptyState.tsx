type EmptyStateProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export default function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
      <h3 className="font-heading text-xl font-semibold text-heading">{title}</h3>
      {description && <p className="mt-2 text-muted">{description}</p>}
      {children}
    </div>
  );
}
