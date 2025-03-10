import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure } from "@headlessui/react";
import ProfileIcon from "@/components/common/ProfileIcon";
import PropagateLoader from "react-spinners/PropagateLoader";
import NotificationIcon from "@/components/common/NotificationIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, Save, Megaphone, BriefcaseBusiness } from "lucide-react";
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import geowork from "@/assets/geowork.svg";
import geoworkLogo from "@/assets/geowork_logo.svg";
import io from "socket.io-client";
import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import SearchBar from "../searchBar/SearchBar";

const FindWork = [
    {
        title: "Find Work",
        href: "/dashboard",
        description: "",
        icon: Search,
    },
    {
        title: "Saved Jobs",
        href: "/savedJobs",
        description: "",
        icon: Save,
    },
];

const Jobs = [
    {
        title: "All Job Posts",
        href: "/dashboard",
        description: "",
        icon: BriefcaseBusiness,
    },
    {
        title: "Saved Geoworkers",
        href: "/savedExperts",
        description: "",
        icon: Save,
    },
];
const postJob = [
    {
        title: "Post a job",
        href: "/jobSlides",
        description: "",
        icon: Megaphone,
    },
];

const ListItem = React.forwardRef(
    ({ className, title, href, Icon, children }, ref) => (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    to={href}
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                >
                    <div className="flex h-4 items-center text-sm font-medium leading-none">
                        {" "}
                        <Icon className=" stroke-[1.5px] mr-2" />
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
);

const callsToAction = [
    // { title: "Watch demo", href: "#", icon: PlayCircleIcon },
    // { title: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [logedIn, setLogedIn] = useState(false);
    const [loading, setloading] = useState(true);
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();
    // useEffect(() => {
    //     const newSocket = io("https://pfe-geowork.onrender.com", {
    //         transports: ["websocket"],
    //     });
    //     setSocket(newSocket);

    //     return () => {
    //         newSocket.disconnect();
    //     };
    // }, []);

    const handleLogOut = async () => {
        //socket.emit("manualDisconnect");
        const response = await axios.post("/logout");
        if (response.data.redirectUrl) {
            navigate(response.data.redirectUrl);
        }
    };
    const [profileIcon, setProfileIcon] = useState({});
    useEffect(() => {
        let timeoutId;
        if (mobileMenuOpen) {
            setIsMenuVisible(true);
        } else {
            // Start the slide-out animation and delay the removal of the menu
            timeoutId = setTimeout(() => setIsMenuVisible(false), 400); // Assumes the animation duration is 500ms
        }
        return () => clearTimeout(timeoutId); // Cleanup timeout
    }, [mobileMenuOpen, isMenuVisible]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("header");
            let profileIcon = {};
            if (response.data) {
                profileIcon = response.data;
                console.log("profileIcon", profileIcon);
            }
            setLogedIn(profileIcon.logedIn);
            setIsClient(profileIcon.isClient);
            setProfileIcon(profileIcon);
            setloading(false);
        };
        fetchData();
    }, []);
    if (loading)
        return (
            <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
                <PropagateLoader color="#FF5400" />
            </div>
        );
    return (
        <header className="flex justify-center items-center w-full pt-2 ">
            <nav
                className="flex items-center justify-between m-3 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-18 w-full max-w-[1600px]"
                aria-label="Global"
            >
                <div className="flex">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Geowork</span>
                        <img
                            className="h-8 w-auto"
                            src={geowork}
                            alt="geowork"
                        />
                    </a>
                </div>
                {logedIn && (
                    <NavigationMenu className="hidden lg:block flex-1 px-8">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    {!isClient ? (
                                        <Link to={"/dashboard"}>Find Work</Link>
                                    ) : (
                                        <Link to={"/dashboard"}>Jobs</Link>
                                    )}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[200px] gap-2 p-4 md:w-[250px] md:grid-cols-1 lg:w-[300px]">
                                        {!isClient
                                            ? FindWork.map((item) => (
                                                  <ListItem
                                                      key={item.title}
                                                      title={item.title}
                                                      href={item.href}
                                                      Icon={item.icon}
                                                  >
                                                      {item.description}
                                                  </ListItem>
                                              ))
                                            : Jobs.map((item) => (
                                                  <ListItem
                                                      key={item.title}
                                                      title={item.title}
                                                      href={item.href}
                                                      Icon={item.icon}
                                                  >
                                                      {item.description}
                                                  </ListItem>
                                              ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            {isClient && (
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>
                                        <Link to={"/jobSlides"}>
                                            Post a job
                                        </Link>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[200px] gap-2 p-4 md:w-[250px] md:grid-cols-1 lg:w-[300px]">
                                            {postJob.map((item) => (
                                                <ListItem
                                                    key={item.title}
                                                    title={item.title}
                                                    href={item.href}
                                                    Icon={item.icon}
                                                >
                                                    {item.description}
                                                </ListItem>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            )}

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to="/messages"
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Messages
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuIndicator />
                        </NavigationMenuList>
                    </NavigationMenu>
                )}
                {/* <div className="flex flex-grow items-center justify-center ">
                    <SearchBar />
                </div> */}
                {logedIn && (
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black hover:opacity-80  transition-translate duration-200  ease-in-out"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                )}

                <div
                    className={
                        logedIn
                            ? "hidden lg:flex lg:flex-1 lg:justify-end"
                            : "flex flex-1 justify-end"
                    }
                >
                    <div
                        className={
                            logedIn
                                ? "hidden lg:flex lg:flex-1 lg:justify-end gap-4"
                                : "flex flex-1 justify-end gap-4"
                        }
                    >
                        {logedIn ? (
                            <>
                                {/* <NotificationIcon /> */}
                                <ProfileIcon
                                    name={profileIcon.name}
                                    photoProfile={profileIcon.photoProfile}
                                    pro={profileIcon.pro}
                                />
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/signup"
                                    className="text-sm font-semibold leading-6 text-white"
                                >
                                    <Button>Sign up</Button>
                                </Link>
                                <Link
                                    to="/login"
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                >
                                    <Button variant="outline">Log in</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            {isMenuVisible && (
                <Dialog
                    as="div"
                    className="lg:hidden"
                    open={true}
                    onClose={() => {
                        setMobileMenuOpen(false);
                    }}
                >
                    <div className="fixed inset-0 z-10" />
                    <Dialog.Panel
                        className={`fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 drop-shadow-[0_0px_70px_rgba(0,0,0,0.20)]
                ${
                    mobileMenuOpen
                        ? "animate-slide-in-right"
                        : "animate-slide-out-right"
                }`}
                    >
                        <div className="flex items-center justify-between">
                            <a href="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Geowork</span>
                                <img
                                    className="h-8 w-auto"
                                    src={geoworkLogo}
                                    alt="Geowork"
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon
                                    className="h-6 w-6 transition-translate duration-200 ease-in-out hover:opacity-75 text-black"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className=""
                                    >
                                        <AccordionItem value="products">
                                            <AccordionTrigger className="flex w-full items-center justify-between -mx-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                {!isClient
                                                    ? "FindWork"
                                                    : "Jobs"}
                                            </AccordionTrigger>
                                            <AccordionContent className="mt-2 space-y-2">
                                                {!isClient
                                                    ? [
                                                          ...FindWork,
                                                          ...callsToAction,
                                                      ].map((item) => (
                                                          <a
                                                              key={item.title}
                                                              href={item.href}
                                                              className=" rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 flex hover:bg-gray-50"
                                                          >
                                                              <item.icon className="mr-2 stroke-[1.5px]" />{" "}
                                                              {item.title}
                                                          </a>
                                                      ))
                                                    : [
                                                          ...Jobs,
                                                          ...callsToAction,
                                                      ].map((item) => (
                                                          <a
                                                              key={item.title}
                                                              href={item.href}
                                                              className="flex rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                          >
                                                              <item.icon className="mr-2 stroke-[1.5px]" />
                                                              {item.title}
                                                          </a>
                                                      ))}
                                            </AccordionContent>
                                        </AccordionItem>
                                        {/* Replicate AccordionItem for other categories as needed */}
                                    </Accordion>
                                    {!isClient && (
                                        <a
                                            href="/profile"
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Profile
                                        </a>
                                    )}
                                    <a
                                        href="/messages"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Messages
                                    </a>
                                    <a
                                        href="/settings"
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Settings
                                    </a>
                                </div>
                                <div className="py-6">
                                    <p
                                        onClick={() => handleLogOut()}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Log out
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            )}
        </header>
    );
}
