package com.example.rasmus.teamfinder;

import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

public class DiscoverActivity extends AppCompatActivity {

    private ArrayList<HashMap<String, String>> players;

    private static final String MY_DISCOVERY_SETTINGS = "MY_DISCOVERY_SETTINGS";
    ImageView playerImage;
    TextView playerName, playerRank, playerPosition, playerInfo;

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_discovery:
                    return true;
                case R.id.navigation_matches:
                    Intent matchesActivityIntent = new Intent(getApplicationContext(), MatchesActivity.class);
                    startActivity(matchesActivityIntent);
                    return true;
                case R.id.navigation_profile:
                    Intent myProfileActivityIntent = new Intent(getApplicationContext(), MyProfileActivity.class);
                    startActivity(myProfileActivityIntent);
                    return true;
            }
            return false;
        }
    };

    public void getNewPlayer() {
        Random r = new Random();
        int max = 2;
        int min = 0;
        int playerIndex = r.nextInt(max - min + 1) + min;
        playerName.setText(players.get(playerIndex).get("name"));
        playerPosition.setText(players.get(playerIndex).get("position"));
        playerRank.setText(players.get(playerIndex).get("rank"));
        playerInfo.setText(players.get(playerIndex).get("info"));

        switch (playerIndex) {
            case 0:
                playerImage.setImageResource(R.drawable.proud_bunny);
                break;
            case 1:
                playerImage.setImageResource(R.drawable.sad_birthday_cat);
                break;
            case 2:
                playerImage.setImageResource(R.drawable.snoopy_pusheen);
                break;
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_discover);
        players = new ArrayList<>();
        players.add(new HashMap<String, String>());
        players.get(players.size()-1).put("name","Snow1");
        players.get(players.size()-1).put("rank","1");
        players.get(players.size()-1).put("position","top");
        players.get(players.size()-1).put("info","Hello my name is Snow");

        players.add(new HashMap<String, String>());
        players.get(players.size()-1).put("name","Snow2");
        players.get(players.size()-1).put("rank","2");
        players.get(players.size()-1).put("position","mid");
        players.get(players.size()-1).put("info","Hello my name is Meow");

        players.add(new HashMap<String, String>());
        players.get(players.size()-1).put("name","Snow5");
        players.get(players.size()-1).put("rank","4");
        players.get(players.size()-1).put("position","AD-carrier");
        players.get(players.size()-1).put("info","Hello my name is wow");

        playerImage = findViewById(R.id.playerImage);
        playerInfo = findViewById(R.id.playerInfo);
        playerName = findViewById(R.id.playerName);
        playerRank = findViewById(R.id.playerRank);
        playerPosition = findViewById(R.id.playerPosition);
        getNewPlayer();

        playerImage.setOnTouchListener(new OnSwipeTouchListener(DiscoverActivity.this) {
            public void onSwipeTop() {
                Toast.makeText(DiscoverActivity.this, "top", Toast.LENGTH_SHORT).show();
            }
            public void onSwipeRight() {
                getNewPlayer();
                Toast.makeText(DiscoverActivity.this, "right", Toast.LENGTH_SHORT).show();
            }
            public void onSwipeLeft() {
                getNewPlayer();
                Toast.makeText(DiscoverActivity.this, "left", Toast.LENGTH_SHORT).show();
            }
            public void onSwipeBottom() {
                Toast.makeText(DiscoverActivity.this, "bottom", Toast.LENGTH_SHORT).show();
            }
        });

        overridePendingTransition(0, 0);

        BottomNavigationView navigation = findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        navigation.setSelectedItemId(R.id.navigation_discovery);

        SharedPreferences prefs = getSharedPreferences(MY_DISCOVERY_SETTINGS, MODE_PRIVATE);

    }

}
