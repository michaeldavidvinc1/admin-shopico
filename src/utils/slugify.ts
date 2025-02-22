export const generateSlug = (text: string) => {
    return text
      .toLowerCase() // Convert text to lowercase
      .normalize("NFD") // Normalize characters (removing accents)
      .replace(/[\u0300-\u036f]/g, "") // Remove remaining accents
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, "") // Remove characters other than letters, numbers, and hyphens
      .replace(/--+/g, "-") // Remove consecutive hyphens
      .replace(/^-+|-+$/g, ""); // Remove hyphens at the start and end
  };