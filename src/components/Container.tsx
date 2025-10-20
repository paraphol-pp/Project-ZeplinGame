type ContainerProps = {
    children: React.ReactNode;
}

const Container = ({children}: ContainerProps) => {
  return (
    <div className="container mx-auto max-w-[420px] md:max-w-[1800px]">{children}</div>
  )
}
export default Container