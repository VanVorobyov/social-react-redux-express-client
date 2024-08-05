import { FC, useContext, useState } from "react"
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { Login } from "../../feature/login"
import { Register } from "../../feature/register"
import { ThemeContext } from "../../components/theme-provider"

export interface IAuthProps {}

export const Auth: FC<IAuthProps> = () => {
  const [selected, setSelected] = useState("login")
  const { theme } = useContext(ThemeContext)

  return (
    <main className={`${theme} min-h-screen text-foreground bg-background`}>
      <div className={`${theme} flex items-center justify-center h-screen`}>
        <div className={`flex-col`}>
          <Card className={`max-w-full w-[340px] h-[450px]`}>
            <CardBody className={`overflow-hidden`}>
              <Tabs
                fullWidth
                size={"md"}
                selectedKey={selected}
                onSelectionChange={key => setSelected(key as string)}
              >
                <Tab key={"login"} title={`Вход`}>
                  <Login setSelected={setSelected} />
                </Tab>
                <Tab key={"register"} title={`Регистрация`}>
                  <Register setSelected={setSelected} />
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  )
}
