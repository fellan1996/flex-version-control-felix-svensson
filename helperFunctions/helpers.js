export function getCSSVar(elementDefiner, variableName) {
  if (
    typeof elementDefiner !== "string" ||
    typeof variableName !== "string" ||
    !variableName
  ) {
    console.log(typeof elementDefiner);
    return "Incorrect arguments. Two arguments are needed and both should be strings";
  }
  if (
    elementDefiner === "root" ||
    elementDefiner === "body" ||
    !elementDefiner
  ) {
    const value = getComputedStyle(document.body).getPropertyValue(
      variableName
    );
    return (
      value ||
      "something went wrong with getting the css variable. Could not find it in the root. Check for example if the name of the variable match."
    );
  }
  const element = document.querySelector(elementDefiner);
  if (!element) {
    return "invalid first argument. Could not find the element";
  }
  const value = getComputedStyle(element).getPropertyValue(variableName);

  return (
    value ||
    "something went wrong with getting the css variable. Could not find it in the element that was found using the first argument you provided. Check for example if the name of the variable match"
  );
}
