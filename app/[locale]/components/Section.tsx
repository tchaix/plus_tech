interface SectionProps {
  title: string;
  description: string;
  className?: string;
}

export default function Section({ title, description, className = '' }: SectionProps) {
  return (
    <div className={`p-8 rounded-lg bg-white shadow-lg ${className}`}>
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}