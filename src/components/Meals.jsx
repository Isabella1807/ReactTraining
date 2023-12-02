import {useEffect, useState} from "react";
import MealItem from "./MealItem.jsx";

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        //Det er ikke tilladt i reasct at tilføje async til component function, derfor er det i en ny funktion
        async function fetchMeals() {
            //Fetch returns a promise, then metoden kan bruges til at lave en funktion der bliver executed når promise bliver resolved
            const response = await fetch('http://localhost:3000/meals');

            if (!response.ok) {
                console.log("hej")
            }
            const meals = await response.json();
            setLoadedMeals(meals);
        }

        fetchMeals();
    }, []); //Deps = Dependencies og hvis den er tom, siger vi at useEffect ikke skal køre igen basically

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal}></MealItem>
            ))}
        </ul>
    )
}