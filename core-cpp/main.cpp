#include "firebase/app.h"
#include "firebase/database.h"

// Initialize Firebase
firebase::App* app = firebase::App::Create(firebase::AppOptions());
firebase::database::Database* database = firebase::database::Database::GetInstance(app);
firebase::database::DatabaseReference db_ref = database->GetReference("players/dr_grant");

// Function to update Credits
void UpdateCredits(int new_credits) {
    db_ref.Child("stats/credits").SetValue(new_credits);
}
