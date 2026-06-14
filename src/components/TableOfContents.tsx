import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = () => {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('.prose-blog h2, .prose-blog h3')
    );

    const tocItems = headings.map((el, i) => {
      if (!el.id) {
        el.id = `toc-${i}`;
      }
      return { id: el.id, text: el.textContent ?? '', level: parseInt(el.tagName[1], 10) };
    });

    setItems(tocItems);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-8% 0px -72% 0px' }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Tabla de contenidos" className="hidden lg:block">
      <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-4">
          Contenido
        </p>
        <ol className="space-y-2.5 border-l border-border pl-4">
          {items.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block text-sm leading-snug transition-colors duration-150 ${
                  level === 3 ? 'pl-3 text-xs' : ''
                } ${
                  activeId === id
                    ? 'text-primary font-semibold -ml-[1px] border-l-2 border-primary pl-[14px]'
                    : 'text-muted-foreground hover:text-primary'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {text}
              </a>
            </li>
          ))}
        </ol>

        <div className="mt-8 pt-6 border-t border-border">
          <a
            href="https://wa.me/529983211547?text=Hola%20Karen,%20le%C3%AD%20tu%20blog%20y%20me%20gustar%C3%ADa%20agendar%20una%20valoraci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2.5 rounded-2xl bg-gradient-primary text-primary-foreground text-xs font-bold uppercase tracking-widest text-center hover:opacity-90 transition-all"
          >
            Agendar valoración
          </a>
        </div>
      </div>
    </nav>
  );
};

export default TableOfContents;
