package com.example.rasmus.teamfinder;

/**
 * Created by Rasmus on 2018-03-07.
 */

public class Player {

    private String name;
    private String position;
    private String rank;
    private String info;
    private int imageRes;

    public String getName() {
        return name;
    }

    public String getPosition() {
        return position;
    }

    public String getRank() {
        return rank;
    }

    public String getInfo() {
        return info;
    }

    public int getImageRes() {
        return imageRes;
    }

        Player(String name, String position, String rank, String info, int imageRes) {
            this.name = name;
            this.position = position;
            this.rank = rank;
            this.info = info;
            this.imageRes = imageRes;
        }


}
