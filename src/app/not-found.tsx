'use client';

// react
import Link from 'next/link';

// styles
import '@/styles/notFoundStyles.scss';

const NotFound = () => {
	return (
		<div id='notfound'>
			<div className='notfound'>
				<div className='notfound-404'>
					<h1>404</h1>
				</div>
				<h2>¡Ups! No se pudo encontrar esta página</h2>
				<p>
					<span>Lo sentimos pero la página que estás buscando no existe, </span>
					<span>ha sido eliminada o no está disponible temporalmente</span>
				</p>
				<Link href='/' replace>
					Ir a la página de inicio
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
