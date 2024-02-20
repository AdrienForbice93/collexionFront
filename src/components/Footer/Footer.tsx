import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer relative p-10 bg-base-200 text-base-content mt-6">
      <aside className="md:max-w-80">
        <h3 className="footer-title">Collexion</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, delectus
          nam aspernatur veniam distinctio perferendis optio, nemo accusamus
          voluptas deleniti dignissimos at quaerat magnam omnis doloribus
          reprehenderit, alias voluptates rerum!
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Contact</h6>
        <a className="link link-hover">contact@collexion.fr</a>
      </nav>
      <nav>
        <h6 className="footer-title">Trouver l'inspiration</h6>
        <NavLink className="link link-hover" to={'/Categories'}>
          Catégories
        </NavLink>
        <NavLink className="link link-hover" to={'/collections'}>
          Collections
        </NavLink>
        <a className="link link-hover">Collection au hasard</a>
        <a className="link link-hover">Objet au hasard</a>
      </nav>
      <nav>
        <h6 className="footer-title">à propos</h6>
        <NavLink className="link link-hover" to={'/user/2'}>
          Mon profil
        </NavLink>
        <NavLink className="link link-hover" to={'/mentions'}>
          Mentions légales & CGU
        </NavLink>
      </nav>
    </footer>
  );
}
