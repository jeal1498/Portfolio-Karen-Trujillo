import Link from 'next/link';
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Página no encontrada | Psic. Karen Trujillo</title>
      </Head>
      <div className="min-h-screen bg-soft-gradient flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-8xl font-serif font-bold text-primary/10 mb-4">404</p>
          <h1 className="text-2xl font-serif font-bold text-primary mb-4">Página no encontrada</h1>
          <p className="text-muted-foreground font-light mb-8">
            La página que buscas no existe. Puede que hayas seguido un enlace incorrecto.
          </p>
          <Link
            href="/"
            className="bg-gradient-primary text-primary-foreground font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-lg inline-block hover:opacity-90 transition-all"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}
