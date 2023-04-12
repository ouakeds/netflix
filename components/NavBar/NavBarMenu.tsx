interface INavBarMenu {
    visible?: boolean;
    links: string[]
}

const NavBarMenu: React.FC<INavBarMenu> = ({visible, links}) => {

    return (
        <>
            {
                visible && (
                    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
                        <div className="flex flex-col gap-4">
                            {
                                links.map((link, key) => {
                                    return <div key={key} className="px-3 text-center text-white hover:underline">{link}</div>
                                })
                            }
                        </div>
                    </div>
                )
            }
        </>

    ) 
}

export default NavBarMenu;