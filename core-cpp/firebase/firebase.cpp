// Simple initialization snippet
firebase::App* app = firebase::App::Create(firebase::AppOptions());
firebase::database::Database* database = firebase::database::Database::GetInstance(app);
firebase::database::DatabaseReference dbRef = database->GetReference();
