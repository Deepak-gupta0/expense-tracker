export async function getProfileData() {
  const response = await fetch("/api/user", {method : 'GET'})
  return response.json()
}
