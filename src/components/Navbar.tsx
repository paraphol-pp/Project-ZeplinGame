// components
import Container from "./Container"


const Navbar = () => {

  const menuItem = [
    "home",
    "favorite",
    "about",
    "Blog",
    "Contact"
  ]

  return (
    <Container>
      <nav className="flex itmes-center justify-between">
        {/* logo */}
        <h1 className="text-3xl font-bold">ZeplinGame</h1>
        <ul className="flex space-x-10">
          {menuItem.map((item,index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </nav>
    </Container>
  )
}
export default Navbar