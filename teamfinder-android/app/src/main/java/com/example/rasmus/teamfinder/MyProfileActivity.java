package com.example.rasmus.teamfinder;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.util.Base64;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.Spinner;

import java.io.ByteArrayOutputStream;

public class MyProfileActivity extends Activity {

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
                    saveDiscoverySettings();
                    startActivity(discoverActivityIntent);
                    return true;
                case R.id.navigation_matches:
                    Intent matchesActivityIntent = new Intent(getApplicationContext(), MatchesActivity.class);
                    saveDiscoverySettings();
                    startActivity(matchesActivityIntent);
                    return true;
                case R.id.navigation_profile:
                    return true;
            }
            return false;
        }
    };

    public void saveDiscoverySettings() {
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

            if (prefs.getString("selectedImage", null) != null) {
                byte[] imageAsBytes = Base64.decode(prefs.getString("selectedImage", null).getBytes(), Base64.DEFAULT);
                profilePicture.setImageBitmap(BitmapFactory.decodeByteArray(imageAsBytes, 0, imageAsBytes.length));
            }
        }
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch(requestCode) {
            case 123:
                Bitmap bitmap = ImagePicker.getImageFromResult(this, resultCode, data);
                if (bitmap != null) {
                    profilePicture.setImageBitmap(bitmap);
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    bitmap.compress(Bitmap.CompressFormat.PNG, 100, baos); //bm is the bitmap object
                    byte[] b = baos.toByteArray();
                    String encoded = Base64.encodeToString(b, Base64.DEFAULT);

                    SharedPreferences.Editor editor = getSharedPreferences(MY_DISCOVERY_SETTINGS, MODE_PRIVATE).edit();
                    editor.putString("selectedImage", encoded);
                    editor.apply();
                }
                break;
            default:
                super.onActivityResult(requestCode, resultCode, data);
                break;
        }
    }
}
