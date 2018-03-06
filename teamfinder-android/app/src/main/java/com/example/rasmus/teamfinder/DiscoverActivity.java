package com.example.rasmus.teamfinder;

import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import static com.example.rasmus.teamfinder.MyProfileActivity.MY_DISCOVERY_SETTINGS;

public class DiscoverActivity extends AppCompatActivity {

//    private ArrayList<HashMap<String, String>> matchedPlayers = new ArrayList<HashMap<String, String>>(){{
//        add(new HashMap<String,String>(){{
//            put("name","Snow1");
//            put("position", "Top");
//            put("rank", "I");
//            put("info", "Hello my name is Snow.");
//        }});
//    }};

    private static final String[] playerNames = {"Snow", "Danette", "Lagging Ninja", "Parachuting Nader", "Bomber", "Gunner", "FighTer", "MeD1c", "Pwner", "Muffins"};
    private static final String[] playerRanks = {"I", "II", "III", "IV", "V"};
    private static final String[] playerPositions = {"Top", "Bottom", "Mid", "AD-Carrier", "Support"};
    private static final String[] playerInfos = {
            "My name is David and I love playing, always play for hours.",
            "Hello, I love playing computer games, right now I'm looking for a team.",
            "Wow, games are soooooooooooooo amazing, plx add.",
            "Hi there, do you wanna play?",
            "<3<3<3<3<3<3<3",
            "IM THE BEST PLAYER IN EXISTENT ALL GAMES ARE THE BEZZZT",
            "I just started playing games and don't really like it that much..."
    };
    private static final int[] playerImages = {
            R.drawable.amumu, R.drawable.ashe, R.drawable.darius, R.drawable.jinx, R.drawable.lux,
            R.drawable.teemo, R.drawable.volibear, R.drawable.annie, R.drawable.braum, R.drawable.karthus,
            R.drawable.katarina, R.drawable.poros
    };

    private ImageView playerImage;
    private TextView playerName, playerRank, playerPosition, playerInfo;
    private SharedPreferences discoverySettings;
    Integer selectedImage;
    String selectedPlayer, selectedInfo, selectedRank, selectedPosition;

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

        int playerIndex = r.nextInt(playerNames.length);
        playerName.setText(playerNames[playerIndex]);
        selectedPlayer = playerNames[playerIndex];

        playerIndex = r.nextInt(playerInfos.length);
        playerInfo.setText(playerInfos[playerIndex]);
        selectedInfo = playerInfos[playerIndex];

        playerIndex = r.nextInt(playerPositions.length);

        if (!discoverySettings.getString("selectedPosition","").equals("Select position…")) {
            playerPosition.setText("Position: " + discoverySettings.getString("selectedPosition",null));
        } else {
            playerPosition.setText("Position: " + playerPositions[playerIndex]);
        }
        selectedPosition = playerPositions[playerIndex];

        playerIndex = r.nextInt(playerRanks.length);

        if (!discoverySettings.getString("selectedRank","").equals("Select rank…")) {
            playerRank.setText("Rank: " + discoverySettings.getString("selectedRank",null));
        } else {
            playerRank.setText("Rank: " + playerRanks[playerIndex]);
        }
        selectedRank = playerRanks[playerIndex];

        playerIndex = r.nextInt(playerImages.length);
        playerImage.setImageResource(playerImages[playerIndex]);
        selectedImage = playerImages[playerIndex];
    }

    private void matchPlayer() {
        Random r = new Random();
        //if (r.nextInt(10) > 4) {
            SharedPreferences.Editor editor = discoverySettings.edit();
            Gson gson = new Gson();

            String json = discoverySettings.getString("matchedPlayerNames", "");
            ArrayList<String> updatedMatchedPlayerNames;
            if (!json.equals("")) {
                ArrayList<String> previouslyMatchedPlayerNames = gson.fromJson(json,new TypeToken<ArrayList<String>>(){}.getType());
                updatedMatchedPlayerNames = new ArrayList<>(previouslyMatchedPlayerNames);
            } else
                updatedMatchedPlayerNames = new ArrayList<>();

            updatedMatchedPlayerNames.add(selectedPlayer);
            json = gson.toJson(updatedMatchedPlayerNames);
            editor.putString("matchedPlayerNames", json);


//            Set<String> previouslyMatchedPlayerPositions = discoverySettings.getStringSet("matchedPlayerPositions",new HashSet<String>());
//            Set<String> previouslyMatchedPlayerRanks = discoverySettings.getStringSet("matchedPlayerRanks",new HashSet<String>());
//            Set<String> previouslyMatchedPlayerInfos = discoverySettings.getStringSet("matchedPlayerInfos",new HashSet<String>());
//            Set<String> previouslyMatchedPlayerImages = discoverySettings.getStringSet("matchedPlayerImages",new HashSet<String>());
//
//            Set<String> updatedMatchedPlayerNames = new HashSet<>(previouslyMatchedPlayerNames);
//            updatedMatchedPlayerNames.add(playerName.getText().toString());
//            editor.putStringSet("matchedPlayerNames", updatedMatchedPlayerNames);
//
//            Set<String> updatedMatchedPlayerPositions = new HashSet<>(previouslyMatchedPlayerPositions);
//            updatedMatchedPlayerPositions.add(playerPosition.getText().toString());
//            editor.putStringSet("matchedPlayerPositions", updatedMatchedPlayerPositions);
//
//            Set<String> updatedMatchedPlayerRanks = new HashSet<>(previouslyMatchedPlayerRanks);
//            updatedMatchedPlayerRanks.add(playerRank.getText().toString());
//            editor.putStringSet("matchedPlayerRanks", updatedMatchedPlayerRanks);
//
//            Set<String> updatedMatchedPlayerInfos = new HashSet<>(previouslyMatchedPlayerInfos);
//            updatedMatchedPlayerInfos.add(playerInfo.getText().toString());
//            editor.putStringSet("matchedPlayerInfos", updatedMatchedPlayerInfos);
//
//            Set<String> updatedMatchedPlayerImages = new HashSet<>(previouslyMatchedPlayerImages);
//            updatedMatchedPlayerImages.add(selectedImage.toString());
//            editor.putStringSet("matchedPlayerImages", updatedMatchedPlayerImages);

            editor.apply();
        //}
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_discover);

        discoverySettings = getSharedPreferences(MY_DISCOVERY_SETTINGS, MODE_PRIVATE);

        playerImage = findViewById(R.id.playerImage);
        playerInfo = findViewById(R.id.playerInfo);
        playerName = findViewById(R.id.playerName);
        playerRank = findViewById(R.id.playerRank);
        playerPosition = findViewById(R.id.playerPosition);

        playerImage.setOnTouchListener(new OnSwipeTouchListener(DiscoverActivity.this) {
            @Override
            public void onSwipeTop() {
            }
            @Override
            public void onSwipeRight() {
                getNewPlayer();
            }
            @Override
            public void onSwipeLeft() {
                getNewPlayer();
                matchPlayer();
            }
            @Override
            public void onSwipeBottom() {
            }
        });

        overridePendingTransition(0, 0);

        BottomNavigationView navigation = findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        navigation.setSelectedItemId(R.id.navigation_discovery);

        getNewPlayer();
    }
}
