package com.example.rasmus.teamfinder;

import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;

public class MyProfileActivity extends AppCompatActivity {

    public static final String MY_DISCOVERY_SETTINGS = "MY_DISCOVERY_SETTINGS";
    ImageView profilePicture;
    Spinner gameDropdown, positionDropdown, rankDropdown;

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_discovery:
                    Intent discoverActivityIntent = new Intent(getApplicationContext(), DiscoverActivity.class);
                    startActivity(discoverActivityIntent);
                    return true;
                case R.id.navigation_matches:
                    Intent matchesActivityIntent = new Intent(getApplicationContext(), MatchesActivity.class);
                    startActivity(matchesActivityIntent);
                    return true;
                case R.id.navigation_profile:
                    return true;
            }
            return false;
        }
    };

    @Override
    public void onSaveInstanceState(Bundle savedInstanceState) {
        super.onSaveInstanceState(savedInstanceState);
        // Save UI state changes to the savedInstanceState.
        // This bundle will be passed to onCreate if the process is
        // killed and restarted.
        SharedPreferences.Editor editor = getSharedPreferences(MY_DISCOVERY_SETTINGS, MODE_PRIVATE).edit();
        editor.putInt("gameIndex", gameDropdown.getSelectedItemPosition());
        editor.putString("selectedGame", gameDropdown.getSelectedItem().toString());
        editor.putInt("positionIndex", positionDropdown.getSelectedItemPosition());
        editor.putString("selectedPosition", positionDropdown.getSelectedItem().toString());
        editor.putInt("rankIndex", rankDropdown.getSelectedItemPosition());
        editor.putString("selectedRank", rankDropdown.getSelectedItem().toString());

        editor.apply();
    }

    @Override
    public void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        // Restore UI state from the savedInstanceState.
        // This bundle has also been passed to onCreate.
        gameDropdown.setSelection(savedInstanceState.getInt("gameIndex"));
        positionDropdown.setSelection(savedInstanceState.getInt("positionIndex"));
        rankDropdown.setSelection(savedInstanceState.getInt("rankIndex"));
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.my_profile);

        overridePendingTransition(0,0);

        BottomNavigationView navigation = findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        navigation.setSelectedItemId(R.id.navigation_profile);

        gameDropdown = findViewById(R.id.gameDropdown);
        ArrayAdapter<String> gameAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, getResources().getStringArray(R.array.dropdown_games));
        gameDropdown.setAdapter(gameAdapter);
        positionDropdown = findViewById(R.id.positionDropdown);
        ArrayAdapter<String> positionAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, getResources().getStringArray(R.array.dropdown_positions));
        positionDropdown.setAdapter(positionAdapter);
        rankDropdown = findViewById(R.id.rankDropdown);
        ArrayAdapter<String> rankAdapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, getResources().getStringArray(R.array.dropdown_ranks));
        rankDropdown.setAdapter(rankAdapter);

        profilePicture = findViewById(R.id.profilePicture);
        profilePicture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent chooseImageIntent = ImagePicker.getPickImageIntent(getApplicationContext());
                startActivityForResult(chooseImageIntent, 123);
            }
        });

        SharedPreferences prefs = getSharedPreferences(MY_DISCOVERY_SETTINGS, MODE_PRIVATE);
        if (prefs != null) {
            gameDropdown.setSelection(prefs.getInt("gameIndex",0));
            positionDropdown.setSelection(prefs.getInt("positionIndex",0));
            rankDropdown.setSelection(prefs.getInt("rankIndex",0));
        }
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch(requestCode) {
            case 123:
                Bitmap bitmap = ImagePicker.getImageFromResult(this, resultCode, data);
                profilePicture.setImageBitmap(bitmap);
                break;
            default:
                super.onActivityResult(requestCode, resultCode, data);
                break;
        }
    }
}
