interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <p className="empty-state-eyebrow">Ready for analysis</p>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}