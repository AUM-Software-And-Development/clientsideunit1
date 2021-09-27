const inputs = document.querySelectorAll(".controls input");

const handleUpdate = (e) => {
  console.log(e.target);
  const suffix = e.target.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${e.target.name}`,
    `${e.target.value}` + suffix
  );
  console.log(suffix);
};

inputs.forEach((input) => input.addEventListener("change", handleUpdate));
inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));
