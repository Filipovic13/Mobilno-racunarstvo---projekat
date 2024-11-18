-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3309
-- Generation Time: Nov 18, 2024 at 02:33 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mobilno_racunarstvo`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `recipe_name` varchar(255) NOT NULL,
  `num_of_ingredients` int(11) NOT NULL,
  `num_of_servings` int(11) NOT NULL,
  `num_of_cal` int(11) NOT NULL,
  `details` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `user_id`, `recipe_name`, `num_of_ingredients`, `num_of_servings`, `num_of_cal`, `details`, `image_url`) VALUES
(1, 3, 'Pancakes', 6, 12, 61, 'STEP 1\n\nPut 100g plain flour, 2 large eggs, 300ml milk, 1 tbsp sunflower or vegetable oil and a pinch of salt into a bowl or large jug, then whisk to a smooth batter. This should be similar in consistency to single cream.\nSTEP 2\n\nSet aside for 30 mins to rest if you have time, or start cooking straight away.\nSTEP 3\n\nSet a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper.\nSTEP 4\n\nWhen hot, cook your pancakes for 1 min on each side until golden, using around half a ladleful of batter per pancake. Keep them warm in a low oven as you make the rest.\nSTEP 5\n\nServe with lemon wedges and caster sugar, or your favourite filling. Once cold, you can layer the pancakes between baking parchment, then wrap in cling film and freeze for up to two months.', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1273477_8-ad36e3b.jpg?quality=90&webp=true&resize=375,341'),
(2, 3, 'Pain au chocolat', 8, 8, 540, 'STEP 1\n\nMake the dough in a stand mixer. Combine the flour, salt, sugar and 20g softened butter. Dissolve the yeast in around 80ml tepid water, around 38C, not too hot or it will kill the yeast. Add 20g of beaten egg and the milk to the stand mixer bowl. Pour in the yeast-water mixture and turn on to a low speed with a dough hook attachment for approximately 5 mins until the dough comes together to form a rough ball. Increase the speed to medium-high and knead for a further 6-10 mins until the dough is smooth. The exact time will depend on your stand mixer.\nSTEP 2\n\nWrap the dough tightly and rest at room temperature for 10 mins. Unwrap and roll out the dough into a rectangle around 4mm thick, about 40 x 30cm. Wrap the dough rectangle and put in the freezer for 1 hr to rest or in the fridge overnight.\nSTEP 3\n\nMeanwhile, on a sheet of baking parchment, shape the remaining 200g butter into a flat rectangle (about 20 x 30cm) using a rolling pin. It should be around half the length of your dough rectangle, but the same width. Put in the fridge until needed – you want it to be cold but flexible.\nSTEP 4\n\nTake the chilled dough out of the fridge or freezer and lay the butter in the centre. Fold the dough edges in to meet at the centre, covering the butter. Rotate the dough 90 degrees and roll it out to about 40cm in length, keeping the same width. Handle the dough gently and return it to the fridge for 10-20 mins if it starts getting too warm.\nSTEP 5\n\nRepeat the process of folding the edges of the dough into the middle, then fold it over on itself again like a book (this is known as a double turn). Chill for 30 mins.\nSTEP 6\n\nRotate the dough 90 degrees again. Roll it out long again and fold the edges in to meet in the middle. Chill for a further 30 mins.\nSTEP 7\n\nRoll out the dough to 32 x 30cm and cut 8 rectangles, 8 x 15cm each. Put a chocolate baton on one long edge of each rectangle, fold the dough inwards, then put the second chocolate baton next to the folded dough and roll the dough around the encase the chocolate, with the seams of the dough now facing down.\nSTEP 8\n\nProve the pain au chocolat at 26-29°C (this is really important as proving at any higher temperature will mean the butter between the layers melts) for around 2-3 hrs, until doubled in size.\nSTEP 9\n\nHeat the oven to 175C/155C fan/gas 4, brush the pain au chocolat with the remaining egg and bake for 15-18 mins until golden brown and cooked through. Best eaten on the day but will keep in an airtight container for two days. ', 'https://images.immediate.co.uk/production/volatile/sites/30/2024/06/PainAuChoc-0ff983a.jpg?quality=90&webp=true&resize=375,341\n'),
(5, 4, 'Sesame salmon, purple sprouting broccoli & sweet potato mash', 11, 2, 463, 'step 1\n\nHeat oven to 200C/180 fan/ gas 6 and line a baking tray with parchment. Mix together 1/2 tbsp sesame oil, the soy, ginger, garlic and honey. Put the sweet potato wedges, skin and all, into a glass bowl with the lime wedges. Cover with cling film and microwave on high for 12-14 mins until completely soft.\nstep 2\n\nMeanwhile, spread the broccoli and salmon out on the baking tray. Spoon over the marinade and season. Roast in the oven for 10-12 mins, then sprinkle over the sesame seeds.\nstep 3\n\nRemove the lime wedges and roughly mash the sweet potato using a fork. Mix in the remaining sesame oil, the chilli and some seasoning. Divide between plates, along with the salmon and broccoli.', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/sesame-salmon-and-purple-broccoli-24cb460.jpg?quality=90&webp=true&resize=375,341'),
(6, 4, 'Vegan chickpea curry jacket potatoes', 14, 4, 276, 'step 1\n\nHeat the oven to 200C/180C fan/gas 6 or if using an air fryer heat to 200C. Prick the sweet potatoes all over with a fork, then put on a baking tray and roast in the oven for 45 mins or in air fryer basket for 50 mins or until tender when pierced with a knife.\nstep 2\n\nMeanwhile, melt the coconut oil in a large saucepan over medium heat. Add the cumin seeds and fry for 1 min until fragrant, then add the onion and fry for 7-10 mins until softened.\nstep 3\n\nPut the garlic, ginger and green chilli into the pan, and cook for 2-3 mins. Add the spices and tikka masala paste and cook for a further 2 mins until fragrant, then tip in the tomatoes. Bring to a simmer, then tip in the chickpeas and cook for a further 20 mins until thickened. Season.\nstep 4\n\nPut the roasted sweet potatoes on four plates and cut open lengthways. Spoon over the chickpea curry and squeeze over the lemon wedges. Season, then scatter with coriander before serving.', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/sweet-potato-curry-46f4bc8.jpg?quality=90&webp=true&resize=375,341');

-- --------------------------------------------------------

--
-- Table structure for table `starred_recipes`
--

CREATE TABLE `starred_recipes` (
  `user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `starred_recipes`
--

INSERT INTO `starred_recipes` (`user_id`, `recipe_id`) VALUES
(2, 2),
(4, 1),
(4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(2, 'Mika', 'mika@email.com', '$2y$10$EZo7IGrO0S31XwmhvHF1Qe1OvVXtjPHRafz6zNeNijTZdwxebbal6'),
(3, 'Zile', 'zika@email.com', '$2y$10$N59qL0LX/Nt7iZQgXQ04IugZNasTEuojj2FNVPmjxJGrV56I3BAse'),
(4, 'Pera', 'pera@email.com', '$2y$10$0EVDXvdobQT91Ggsvj7i0O7S50Xey2m5fH9ZBpQgWhv3tttVMflWO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipes_ibfk_1` (`user_id`);

--
-- Indexes for table `starred_recipes`
--
ALTER TABLE `starred_recipes`
  ADD PRIMARY KEY (`user_id`,`recipe_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `starred_recipes_ibfk_2` (`recipe_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `starred_recipes`
--
ALTER TABLE `starred_recipes`
  ADD CONSTRAINT `starred_recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `starred_recipes_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
