import React, { useEffect, useState } from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

function AvailableMeals() {
  const [meals, setmeals] = useState([])
  const [isloading, setisloading] = useState(true);
  const [iserror, setiserror] = useState(null)
  // const DUMMY_MEALS = [//note ye dummy meals me id is necessay coz here every object will map to a list item which shoul be unique and hence should has the id
  //     {
  //       id: 'm1',
  //       name: 'Sushi',
  //       description: 'Finest fish and veggies',
  //       price: 22.99,
  //     },
  //     {
  //       id: 'm2',
  //       name: 'Schnitzel',
  //       description: 'A german specialty!',
  //       price: 16.5,
  //     },
  //     {
  //       id: 'm3',
  //       name: 'Barbecue Burger',
  //       description: 'American, raw, meaty',
  //       price: 12.99,
  //     },
  //     {
  //       id: 'm4',
  //       name: 'Green Bowl',
  //       description: 'Healthy...and green...',
  //       price: 18.99,
  //     },
  //   ];
  //   const mealsList =DUMMY_MEALS.map(meal => <li>{meal.name}</li>)

  console.log('availablemeals');
  useEffect(() => {
    const fetchMeals = async () => {
      try {

        const response = await fetch('https://hooksss-c4d70-default-rtdb.firebaseio.com/meals.json')
        if (!response.ok) {
          throw new Error("Something went wrong")
        }
        const responseData = await response.json()
        // console.log(responseData)
        //we get back a object in response data with differenct keys(m1,m2..)and their values as nested object with the properties
        const loadedMeals = [];
        for (const key in responseData) {
          //coz we want array of objects
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,

          })
        }
        setmeals(loadedMeals)
        setisloading(false)
      }
      catch (error) {
        // alert('hi')
        setisloading(false)
        setiserror(error.message)

      }

    }
    fetchMeals()
  }, [])

  if (iserror) {
    return (
      <section className={classes.MealsError}>
        <p>{iserror}</p>
      </section>
    )
  }
  //another way of conditional rendering..the code below if will not run until the data is fetched
  if (isloading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  const mealsList = meals.map(meal => <MealItem
    id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />)
  //now this approach was temporar coz we gonna create a separate meal item componenet in a new folder coz there we wil have meal item and a form to add new meal to cart so further 2 componenets
  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>

    </section>
  )
}

export default AvailableMeals
