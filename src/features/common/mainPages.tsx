// main page details are pulled from here any time they are needed
import Map from '../map/Map';
import Campaigns from '../campaigns/Campaigns';
import Characters from '../characters/Characters';
import Monsters from '../monsters/Monsters';

export default [
    {
        label: "Map",
        href: "/map",
        component: Map,
    },
    {
        label: "Characters",
        href: "/characters",
        component: Characters,
    },
    {
        label: "Campaigns",
        href: "/campaigns",
        component: Campaigns,
    },
    {
        label: "Monsters",
        href: "/monsters",
        component: Monsters,
    }
]