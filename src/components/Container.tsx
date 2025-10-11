type ContainerProps = {
    children: React.ReactNode;
}

const Container = ({children}: ContainerProps) => {
  return (
    <div className="container mx-auto max-w-[1600px] pt-8">{children}</div>
  )
}
export default Container