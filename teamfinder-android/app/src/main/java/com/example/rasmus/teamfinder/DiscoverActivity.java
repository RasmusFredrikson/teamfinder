package com.example.rasmus.teamfinder;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.graphics.Point;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.view.Gravity;
import android.view.MenuItem;

import com.mindorks.placeholderview.SwipeDecor;
import com.mindorks.placeholderview.SwipePlaceHolderView;

import java.util.Random;

import static com.example.rasmus.teamfinder.MyProfileActivity.MY_DISCOVERY_SETTINGS;

public class DiscoverActivity extends Activity {

    private static final String[] playerNames = {"Snow", "Danette", "Ninja", "Nader", "Bomber", "Gunner", "FighTer", "MeD1c", "Pwner", "Muffins"};
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

    private SwipePlaceHolderView mSwipeView;
    private Context mContext;
    private SharedPreferences discoverySettings;
    Integer selectedImage;
    String selectedName, selectedInfo, selectedRank, selectedPosition;

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

    public Player getNewPlayer() {
        Random r = new Random();
        Resources res = getResources();

        selectedName = playerNames[r.nextInt(playerNames.length)];
        selectedInfo = playerInfos[r.nextInt(playerInfos.length)];
        selectedImage = playerImages[r.nextInt(playerImages.length)];

        if (!discoverySettings.getString("selectedPosition","").equals(res.getString(R.string.no_position_selected))) {
            selectedPosition = discoverySettings.getString("selectedPosition", null);
        } else {
            selectedPosition = playerPositions[r.nextInt(playerPositions.length)];
        }

        if (!discoverySettings.getString("selectedRank","").equals(res.getString(R.string.no_rank_selected))) {
            selectedRank = discoverySettings.getString("selectedRank", null);
        } else {
            selectedRank = playerRanks[r.nextInt(playerRanks.length)];
        }

        return new Player(selectedName, selectedPosition, selectedRank, selectedInfo, selectedImage);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_discover);

        discoverySettings = getSharedPreferences(MY_DISCOVERY_SETTINGS, MODE_PRIVATE);

        mSwipeView = findViewById(R.id.swipeView);
        mContext = getApplicationContext();

        int bottomMargin = com.example.rasmus.teamfinder.Utils.dpToPx(160);
        Point windowSize = com.example.rasmus.teamfinder.Utils.getDisplaySize(getWindowManager());
        mSwipeView.getBuilder()
                .setDisplayViewCount(3)
                .setIsUndoEnabled(true)
                .setHeightSwipeDistFactor(10)
                .setWidthSwipeDistFactor(5)
                .setSwipeDecor(new SwipeDecor()
                        .setViewWidth(windowSize.x)
                        .setViewHeight(windowSize.y - bottomMargin)
                        .setViewGravity(Gravity.TOP)
                        .setPaddingTop(20)
                        .setRelativeScale(0.01f)
                        .setSwipeMaxChangeAngle(2f)
                        .setSwipeInMsgLayoutId(R.layout.tinder_swipe_in_msg_view)
                        .setSwipeOutMsgLayoutId(R.layout.tinder_swipe_out_msg_view));

        for (int i = 0; i < 20; i++) {
            mSwipeView.addView(new PlayerCard(mContext, getNewPlayer(), mSwipeView, discoverySettings));
        }

        overridePendingTransition(0, 0);

        BottomNavigationView navigation = findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        navigation.setSelectedItemId(R.id.navigation_discovery);
    }
}
