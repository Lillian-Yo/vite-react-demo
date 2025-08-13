import './index.css';

/**
 * @name 404页面
 *
*/

export default function NonePage() {
    return (
        <div className="not-find-page">
            <nav className="shelf">
                <a className="book home-page" href="/home">Home page</a>
                <a className="book about-us" href="/record">Record page</a>
                {/* <a className="book contact">Contact</a>
                <a className="book faq">F.A.Q.</a> */}

                <span className="book not-found"></span>

                <span className="door left"></span>
                <span className="door right"></span>
            </nav>
            <h1>Error 404</h1>
            <p>The page you're loking for can't be found</p>
        </div>
    )
}